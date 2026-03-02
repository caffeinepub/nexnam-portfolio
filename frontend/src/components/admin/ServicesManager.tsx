import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useServicesQuery, useAddService, useUpdateService, useDeleteService } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Loader2, Plus, Pencil, Trash2, Layers, X, Save, CheckCircle } from 'lucide-react';
import type { Service } from '../../backend';

type FormMode = 'add' | 'edit' | null;

export default function ServicesManager() {
  const { data: services = [], isLoading } = useServicesQuery();
  const addService = useAddService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [mode, setMode] = useState<FormMode>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Service>();

  const openAdd = () => {
    reset({ title: '', description: '', icon: '' });
    setEditingTitle(null);
    setMode('add');
  };

  const openEdit = (service: Service) => {
    reset(service);
    setEditingTitle(service.title);
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

  const onSubmit = async (data: Service) => {
    if (mode === 'add') {
      await addService.mutateAsync(data);
      showSuccess('Service added successfully!');
    } else if (mode === 'edit') {
      await updateService.mutateAsync(data);
      showSuccess('Service updated successfully!');
    }
    closeForm();
  };

  const handleDelete = async (title: string) => {
    await deleteService.mutateAsync(title);
    setDeleteConfirm(null);
    showSuccess('Service deleted successfully!');
  };

  const isPending = addService.isPending || updateService.isPending;

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
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Services</CardTitle>
                <CardDescription>{services.length} service{services.length !== 1 ? 's' : ''} total</CardDescription>
              </div>
            </div>
            {mode === null && (
              <Button onClick={openAdd} size="sm">
                <Plus className="w-4 h-4 mr-2" />Add Service
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
                <h3 className="font-semibold text-foreground">{mode === 'add' ? 'Add New Service' : 'Edit Service'}</h3>
                <Button variant="ghost" size="icon" onClick={closeForm}><X className="w-4 h-4" /></Button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      {...register('title', { required: true })}
                      placeholder="Service title"
                      disabled={mode === 'edit'}
                    />
                    {errors.title && <p className="text-xs text-destructive">Title is required</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Icon (emoji or name)</Label>
                    <Input {...register('icon')} placeholder="e.g. 🚀 or rocket" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea {...register('description', { required: true })} placeholder="Service description" rows={3} />
                  {errors.description && <p className="text-xs text-destructive">Description is required</p>}
                </div>
                {(addService.isError || updateService.isError) && (
                  <Alert variant="destructive">
                    <AlertDescription>Failed to save service. Please try again.</AlertDescription>
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

          {services.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No services yet. Add your first service!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {services.map((service, idx) => (
                <div key={service.title}>
                  {idx > 0 && <Separator />}
                  <div className="flex items-start justify-between py-3 gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {service.icon && <span className="text-lg">{service.icon}</span>}
                        <h4 className="font-medium text-foreground">{service.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEdit(service)}
                        disabled={mode !== null}
                        className="h-8 w-8"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      {deleteConfirm === service.title ? (
                        <div className="flex gap-1">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(service.title)}
                            disabled={deleteService.isPending}
                            className="h-8 text-xs"
                          >
                            {deleteService.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm'}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(null)} className="h-8 text-xs">
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setDeleteConfirm(service.title)}
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
