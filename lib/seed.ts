import { Company } from './models/Company';
import { CacheProvider } from './models/CacheProvider';
import { Server } from './models/Server';
import { Distribution } from './models/Distribution';
import { mockCompanies, mockCacheProviders, mockServers, mockDistributions } from './mock-data';

export async function seedDatabase() {
  try {
    const companyCount = await Company.countDocuments();
    const providerCount = await CacheProvider.countDocuments();
    const serverCount = await Server.countDocuments();
    const distributionCount = await Distribution.countDocuments();
    
    // Check if Akamai, Virgo, or Asia Intel is missing to detect if we need migration/reseeding
    const hasAkamai = await CacheProvider.findOne({ shortCode: 'Akamai' });
    const hasVirgo = await Company.findOne({ name: 'Virgo Communications Limited' });
    const hasAsiaIntel = await Company.findOne({ name: 'Asia Intel Communications' });

    if (companyCount !== 143 || providerCount === 0 || serverCount === 0 || !hasAkamai || !hasVirgo || !hasAsiaIntel) {
      console.log('--- DB needs seeding/reseeding, clearing collections ---');
      await Company.deleteMany({});
      await CacheProvider.deleteMany({});
      await Server.deleteMany({});
      await Distribution.deleteMany({});
      
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

      // 4. Seed Distributions
      let seededDistCount = 0;
      for (const mockDist of mockDistributions) {
        const { id, companyId, cacheProviderId, serverId, ...data } = mockDist;
        const realCompanyId = companyMap.get(companyId);
        const realProviderId = providerMap.get(cacheProviderId);
        const realServerId = serverMap.get(serverId);

        if (realCompanyId && realProviderId && realServerId) {
          await Distribution.create({
            ...data,
            companyId: realCompanyId,
            cacheProviderId: realProviderId,
            serverId: realServerId,
            createdAt: mockDist.createdAt || new Date(),
            updatedAt: mockDist.updatedAt || new Date(),
          });
          seededDistCount++;
        }
      }
      console.log(`Seeded ${seededDistCount} distributions.`);

      // 5. Recalculate server capacity based on seeded active distributions
      const serversList = await Server.find({});
      for (const srv of serversList) {
        const activeDistributions = await Distribution.find({ serverId: srv._id, status: 'Active' });
        const usedCapacity = activeDistributions.reduce((sum, d) => sum + d.capacityGB, 0);
        srv.usedCapacityGB = usedCapacity;
        await srv.save();
      }
      console.log('Recalculated used capacity for all servers.');

      // 6. Recalculate cache provider stats based on seeded active distributions
      const providersList = await CacheProvider.find({});
      for (const cp of providersList) {
        const activeDistributions = await Distribution.find({ cacheProviderId: cp._id, status: 'Active' });
        const serverCount = activeDistributions.reduce((sum, d) => sum + (d.serverCount || 1), 0);
        const totalCapacity = activeDistributions.reduce((sum, d) => sum + d.capacityGB, 0);
        
        cp.serverCount = serverCount;
        cp.totalCapacity = totalCapacity;
        cp.usedServerCount = serverCount;
        cp.usedCapacity = totalCapacity;
        await cp.save();
      }
      console.log('Recalculated server count and capacity for all cache providers.');
      console.log('--- Seeding completed successfully ---');
    }

    // ALWAYS recalculate and sync capacities and quantities on startup to ensure stats are in sync with live distributions
    console.log('--- Syncing cache provider and server statistics with database distributions ---');
    const serversList = await Server.find({});
    for (const srv of serversList) {
      const activeDistributions = await Distribution.find({ serverId: srv._id, status: 'Active' });
      const usedCapacity = activeDistributions.reduce((sum, d) => sum + d.capacityGB, 0);
      if (srv.usedCapacityGB !== usedCapacity) {
        srv.usedCapacityGB = usedCapacity;
        await srv.save();
      }
    }

    const providersList = await CacheProvider.find({});
    for (const cp of providersList) {
      const activeDistributions = await Distribution.find({ cacheProviderId: cp._id, status: 'Active' });
      const serverCountVal = activeDistributions.reduce((sum, d) => sum + (d.serverCount || 1), 0);
      const totalCapacityVal = activeDistributions.reduce((sum, d) => sum + d.capacityGB, 0);

      if (
        cp.serverCount !== serverCountVal ||
        cp.totalCapacity !== totalCapacityVal ||
        cp.usedServerCount !== serverCountVal ||
        cp.usedCapacity !== totalCapacityVal
      ) {
        cp.serverCount = serverCountVal;
        cp.totalCapacity = totalCapacityVal;
        cp.usedServerCount = serverCountVal;
        cp.usedCapacity = totalCapacityVal;
        await cp.save();
      }
    }
    console.log('--- Cache statistics synced successfully ---');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}
