import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProjectsQuery, useAddProject, useUpdateProject, useDeleteProject } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Loader2, Plus, Pencil, Trash2, FolderOpen, X, Save, CheckCircle } from 'lucide-react';
import type { Project } from '../../backend';

type FormMode = 'add' | 'edit' | null;

export default function ProjectsManager() {
  const { data: projects = [], isLoading } = useProjectsQuery();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [mode, setMode] = useState<FormMode>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Project>();

  const openAdd = () => {
    reset({ title: '', description: '', category: '', image: '', results: '' });
    setEditingTitle(null);
    setMode('add');
  };

  const openEdit = (project: Project) => {
    reset(project);
    setEditingTitle(project.title);
    setMode('edit');
  };

  const closeForm = () => {
    setMode(null);
    setEditingTitle(null);
    reset();
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const onSubmit = async (data: Project) => {
    if (mode === 'add') {
      await addProject.mutateAsync(data);
      showSuccess('Project added successfully!');
    } else if (mode === 'edit') {
      await updateProject.mutateAsync(data);
      showSuccess('Project updated successfully!');
    }
    closeForm();
  };

  const handleDelete = async (title: string) => {
    await deleteProject.mutateAsync(title);
    setDeleteConfirm(null);
    showSuccess('Project deleted successfully!');
  };

  const isPending = addProject.isPending || updateProject.isPending;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Projects</CardTitle>
                <CardDescription>{projects.length} project{projects.length !== 1 ? 's' : ''} total</CardDescription>
              </div>
            </div>
            {mode === null && (
              <Button onClick={openAdd} size="sm">
                <Plus className="w-4 h-4 mr-2" />Add Project
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {successMsg && (
            <Alert className="mb-4 border-success/30 bg-success/10">
              <CheckCircle className="w-4 h-4 text-success" />
              <AlertDescription className="text-success">{successMsg}</AlertDescription>
            </Alert>
          )}

          {mode !== null && (
            <div className="mb-6 p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{mode === 'add' ? 'Add New Project' : 'Edit Project'}</h3>
                <Button variant="ghost" size="icon" onClick={closeForm}><X className="w-4 h-4" /></Button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      {...register('title', { required: true })}
                      placeholder="Project title"
                      disabled={mode === 'edit'}
                    />
                    {errors.title && <p className="text-xs text-destructive">Title is required</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Input {...register('category', { required: true })} placeholder="e.g. Web Design, Branding" />
                    {errors.category && <p className="text-xs text-destructive">Category is required</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea {...register('description', { required: true })} placeholder="Project description" rows={3} />
                  {errors.description && <p className="text-xs text-destructive">Description is required</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input {...register('image')} placeholder="https://example.com/image.jpg" />
                  </div>
                  <div className="space-y-2">
                    <Label>Results</Label>
                    <Input {...register('results')} placeholder="e.g. 200% increase in traffic" />
                  </div>
                </div>
                {(addProject.isError || updateProject.isError) && (
                  <Alert variant="destructive">
                    <AlertDescription>Failed to save project. Please try again.</AlertDescription>
                  </Alert>
                )}
                <div className="flex gap-2">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : <><Save className="w-4 h-4 mr-2" />Save</>}
                  </Button>
                  <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
                </div>
              </form>
            </div>
          )}

          {projects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No projects yet. Add your first project!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project, idx) => (
                <div key={project.title}>
                  {idx > 0 && <Separator />}
                  <div className="flex items-start justify-between py-3 gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">{project.title}</h4>
                        <Badge variant="secondary" className="text-xs shrink-0">{project.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      {project.results && (
                        <p className="text-xs text-primary mt-1">📈 {project.results}</p>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEdit(project)}
                        disabled={mode !== null}
                        className="h-8 w-8"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      {deleteConfirm === project.title ? (
                        <div className="flex gap-1">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(project.title)}
                            disabled={deleteProject.isPending}
                            className="h-8 text-xs"
                          >
                            {deleteProject.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm'}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(null)} className="h-8 text-xs">
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setDeleteConfirm(project.title)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
