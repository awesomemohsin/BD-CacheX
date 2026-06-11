import { Company } from './models/Company';
import { CacheProvider } from './models/CacheProvider';
import { Server } from './models/Server';
import { Allocation } from './models/Allocation';
import { mockCompanies, mockCacheProviders, mockServers, mockAllocations } from './mock-data';

export async function seedDatabase() {
  try {
    const companyCount = await Company.countDocuments();
    const providerCount = await CacheProvider.countDocuments();
    const serverCount = await Server.countDocuments();
    const allocationCount = await Allocation.countDocuments();
    
    // Check if Akamai, Virgo, or Asia Intel is missing to detect if we need migration/reseeding
    const hasAkamai = await CacheProvider.findOne({ shortCode: 'Akamai' });
    const hasVirgo = await Company.findOne({ name: 'Virgo Communications Limited' });
    const hasAsiaIntel = await Company.findOne({ name: 'Asia Intel Communications' });

    // Check if cache provider capacities match the new list
    const providers = await CacheProvider.find({});
    const dbTotalCapacity = providers.reduce((sum, p) => sum + (p.totalCapacity || 0), 0);
    const expectedTotalCapacity = 3908.1;
    const capacityMatches = Math.abs(dbTotalCapacity - expectedTotalCapacity) < 0.1;

    if (companyCount !== 143 || providerCount === 0 || serverCount === 0 || !hasAkamai || !hasVirgo || !hasAsiaIntel || !capacityMatches) {
      console.log('--- DB needs seeding/reseeding, clearing collections ---');
      await Company.deleteMany({});
      await CacheProvider.deleteMany({});
      await Server.deleteMany({});
      await Allocation.deleteMany({});
      
      console.log('--- Starting auto-seeding with mock data ---');

      // 1. Seed Companies
      const companyMap = new Map<string, string>();
      for (const mockComp of mockCompanies) {
        const { id, ...data } = mockComp;
        const doc = await Company.create({
          ...data,
          createdAt: mockComp.createdAt || new Date(),
          updatedAt: mockComp.updatedAt || new Date(),
        });
        companyMap.set(id, doc._id.toString());
      }
      console.log(`Seeded ${companyMap.size} companies.`);

      // 2. Seed Cache Providers
      const providerMap = new Map<string, string>();
      for (const mockProvider of mockCacheProviders) {
        const { id, ...data } = mockProvider;
        const doc = await CacheProvider.create({
          ...data,
          createdAt: mockProvider.createdAt || new Date(),
          updatedAt: mockProvider.updatedAt || new Date(),
        });
        providerMap.set(id, doc._id.toString());
      }
      console.log(`Seeded ${providerMap.size} cache providers.`);

      // 3. Seed Servers
      const serverMap = new Map<string, string>();
      for (const mockSrv of mockServers) {
        const { id, ...data } = mockSrv;
        const doc = await Server.create({
          ...data,
          createdAt: mockSrv.createdAt || new Date(),
          updatedAt: mockSrv.updatedAt || new Date(),
        });
        serverMap.set(id, doc._id.toString());
      }
      console.log(`Seeded ${serverMap.size} servers.`);

      // 4. Seed Allocations
      let seededAllocCount = 0;
      for (const mockAlloc of mockAllocations) {
        const { id, companyId, cacheProviderId, serverId, ...data } = mockAlloc;
        const realCompanyId = companyMap.get(companyId);
        const realProviderId = providerMap.get(cacheProviderId);
        const realServerId = serverMap.get(serverId);

        if (realCompanyId && realProviderId && realServerId) {
          await Allocation.create({
            ...data,
            companyId: realCompanyId,
            cacheProviderId: realProviderId,
            serverId: realServerId,
            createdAt: mockAlloc.createdAt || new Date(),
            updatedAt: mockAlloc.updatedAt || new Date(),
          });
          seededAllocCount++;
        }
      }
      console.log(`Seeded ${seededAllocCount} allocations.`);

      // 5. Recalculate server capacity based on seeded active allocations
      const serversList = await Server.find({});
      for (const srv of serversList) {
        const activeAllocations = await Allocation.find({ serverId: srv._id, status: 'Active' });
        const usedCapacity = activeAllocations.reduce((sum, a) => sum + a.capacityGB, 0);
        srv.usedCapacityGB = usedCapacity;
        await srv.save();
      }
      console.log('Recalculated used capacity for all servers.');

      // 6. Recalculate cache provider stats based on seeded active allocations
      const providersList = await CacheProvider.find({});
      for (const cp of providersList) {
        const activeAllocations = await Allocation.find({ cacheProviderId: cp._id, status: 'Active' });
        const serverCount = activeAllocations.reduce((sum, a) => sum + (a.serverCount || 1), 0);
        const totalCapacity = activeAllocations.reduce((sum, a) => sum + a.capacityGB, 0);
        
        cp.serverCount = serverCount;
        cp.totalCapacity = totalCapacity;
        cp.usedServerCount = serverCount;
        cp.usedCapacity = totalCapacity;
        await cp.save();
      }
      console.log('Recalculated server count and capacity for all cache providers.');
      console.log('--- Seeding completed successfully ---');
    }
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}
