import React from 'react';
import { useFounderQuery } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function TeamSection() {
  const { data: founder, isLoading } = useFounderQuery();

  const cleanBio = (bio: string) => bio.replace(/\//g, '').trim();

  return (
    <section id="team" className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Meet the <span className="text-gradient">Founder</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The visionary behind NexNam Digital.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center gap-6">
            <Skeleton className="w-40 h-40 rounded-full" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-20 w-full max-w-lg" />
          </div>
        ) : founder ? (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                <img
                  src={founder.photo || '/assets/generated/avatar-alex.dim_200x200.png'}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/generated/avatar-alex.dim_200x200.png';
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground text-lg">✦</span>
              </div>
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-1">{founder.name}</h3>
            <p className="text-primary font-medium mb-4">{founder.title}</p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">{cleanBio(founder.bio)}</p>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <p>Founder information coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}
