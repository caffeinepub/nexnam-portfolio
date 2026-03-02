import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFounderQuery, useUpdateFounder } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Save, User, CheckCircle } from 'lucide-react';
import type { Founder } from '../../backend';

export default function FounderEditor() {
  const { data: founder, isLoading } = useFounderQuery();
  const updateFounder = useUpdateFounder();
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<Founder>();

  useEffect(() => {
    if (founder) {
      reset(founder);
    }
  }, [founder, reset]);

  const onSubmit = async (data: Founder) => {
    await updateFounder.mutateAsync(data);
    reset(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Founder Information</CardTitle>
            <CardDescription>Update the founder's profile displayed on the website</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register('name', { required: true })} placeholder="e.g. Nikhil Shahi" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title / Role</Label>
              <Input id="title" {...register('title', { required: true })} placeholder="e.g. Founder & CEO" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...register('bio', { required: true })}
              placeholder="Write a short bio..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Photo URL</Label>
            <Input id="photo" {...register('photo')} placeholder="https://example.com/photo.jpg or /images/photo.png" />
            {founder?.photo && (
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={founder.photo}
                  alt="Current photo"
                  className="w-16 h-16 rounded-full object-cover border-2 border-border"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="text-sm text-muted-foreground">Current photo preview</span>
              </div>
            )}
          </div>

          {updateFounder.isSuccess && (
            <Alert className="border-success/30 bg-success/10">
              <CheckCircle className="w-4 h-4 text-success" />
              <AlertDescription className="text-success">Founder info updated successfully!</AlertDescription>
            </Alert>
          )}

          {updateFounder.isError && (
            <Alert variant="destructive">
              <AlertDescription>Failed to update. Please try again.</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={updateFounder.isPending || !isDirty} className="w-full sm:w-auto">
            {updateFounder.isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>
            ) : (
              <><Save className="w-4 h-4 mr-2" />Save Changes</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
