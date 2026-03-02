import { useState, useEffect, useCallback } from 'react';
import { useActor } from './useActor';

const AUTH_KEY = 'nexnam_admin_auth';

export function useAuth() {
  const { actor } = useActor();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (password: string) => {
    if (!actor) {
      setError('Connection not ready. Please try again.');
      return false;
    }
    setIsLoading(true);
    setError(null);
    try {
      await actor.authenticate(password);
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    } catch {
      setError('Invalid password. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [actor]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  useEffect(() => {
    if (!actor) return;
    actor.isAdminAuthenticated().then((val) => {
      if (!val) {
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH_KEY);
      }
    }).catch(() => {});
  }, [actor]);

  return { isAuthenticated, isLoading, error, login, logout };
}
