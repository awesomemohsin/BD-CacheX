import { ActivityLog } from '@/lib/models/ActivityLog';

/**
 * Logs a user activity in the database.
 * @param request The API Request object to extract headers from
 * @param action The action type (e.g. CREATE, UPDATE, DELETE)
 * @param entity The target entity (e.g. Company, CacheProvider, Server, Distribution)
 * @param details Descriptive message about the action
 * @returns The user email that performed the action
 */
export async function logActivity(
  request: Request,
  action: string,
  entity: string,
  details: string
): Promise<string> {
  const userEmail = request.headers.get('x-user-email') || 'admin@bdcache.com';
  try {
    await ActivityLog.create({
      action,
      entity,
      details,
      userEmail,
    });
  } catch (err) {
    console.error('Failed to write activity log:', err);
  }
  return userEmail;
}
