import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Founder, Project, Service } from '../backend';

export function useFounderQuery() {
  const { actor, isFetching } = useActor();
  return useQuery<Founder>({
    queryKey: ['founder'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not ready');
      return actor.getFounder();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProjectsQuery() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useServicesQuery() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContactsQuery() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateFounder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Founder) => {
      if (!actor) throw new Error('Actor not ready');
      await actor.updateFounder(data.name, data.title, data.bio, data.photo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['founder'] });
    },
  });
}

export function useAddProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Project) => {
      if (!actor) throw new Error('Actor not ready');
      await actor.addProject(data.title, data.description, data.category, data.image, data.results);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Project) => {
      if (!actor) throw new Error('Actor not ready');
      await actor.updateProject(data.title, data.description, data.category, data.image, data.results);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error('Actor not ready');
      await actor.deleteProject(title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useAddService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Service) => {
      if (!actor) throw new Error('Actor not ready');
      await actor.addService(data.title, data.description, data.icon);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Service) => {
      if (!actor) throw new Error('Actor not ready');
      await actor.updateService(data.title, data.description, data.icon);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useDeleteService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error('Actor not ready');
      await actor.deleteService(title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not ready');
      await actor.submitContact(data.name, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}
