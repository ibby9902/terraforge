import React from 'react';

import ModInfoCard from '@/components/mod/mod-info-card';
import { db } from '@/server/db';
import ModAuthorCard from '@/components/mod/mod-author-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExternalResourcesCard from '@/components/mod/external-resources-card';
import ModDescriptionForm from '@/components/forms/mod-description-form';
import { getServerAuthSession } from '@/server/auth';
import SettingsTabContent from '@/components/mod/settings-tab-content';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const mod = await db.project.findUnique({
    where: {
      type: "mod",
      slug: params.slug
    }
  });
  return {
    title: `${mod?.name} - Terraforge`
  };
}

const ModPage = async ({ params }: Props) => {
  const session = await getServerAuthSession();
  const mod = await db.project.findUnique({
    where: {
      type: "mod",
      slug: params.slug
    },
    include: {
      author: true,
      tags: {
        include: {
          tag: true
        }
      }
    }
  });

  if (!mod) {
    return <div className='w-full flex h-full justify-center items-center'>Mod not found</div>;
  }

  const canEdit = session?.user?.id === mod.author.id ? true : false;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-8 gap-6 pt-16 h-full grid-rows-3 lg:grid-rows-1'>
      <div className='lg:col-span-2 flex flex-col gap-4'>
        <ModInfoCard
          modId={mod.id}
          icon={mod.icon}
          name={mod.name}
          summary={mod.summary}
          downloads={mod.downloads}
          createdAtTimeStamp={mod.createdAt.toLocaleDateString()}
          updatedAtTimeStamp={mod.updatedAt.toLocaleDateString()}
          approved={mod.approved}
          draft={mod.draft}
          canEdit={canEdit}
        />
        <div className='row-start-3 flex flex-col gap-4'>
          <ExternalResourcesCard issueLink={mod.issuesLink} sourceLink={mod.sourceLink} wikiLink={mod.wikiLink} discordLink={mod.discordLink} />
          <ModAuthorCard name={mod.author.name} avatar={mod.author.image} />
        </div>
      </div>
      <div className='w-full lg:col-span-6 flex flex-col gap-4 lg:row-start-1'>
        <Tabs defaultValue="description">
          <TabsList className='w-full flex justify-evenly'>
            <TabsTrigger value="description" className='w-full'>Description</TabsTrigger>
            <TabsTrigger value="gallery" className='w-full'>Gallery</TabsTrigger>
            <TabsTrigger value="releases" className='w-full'>Releases</TabsTrigger>
            {canEdit && <TabsTrigger value="settings" className='w-full'>Settings</TabsTrigger>}
          </TabsList>
          <TabsContent value="description">
            <ModDescriptionForm canEdit={canEdit} description={mod.description} modId={mod.id}/>
          </TabsContent>
          <TabsContent value="gallery" className='bg-accent rounded-xl p-4'>Mod gallery here</TabsContent>
          <TabsContent value="releases" className='bg-accent rounded-xl p-4'>Mod releases here</TabsContent>
          {canEdit && <TabsContent value="settings" className='bg-accent rounded-xl p-4'>
            <SettingsTabContent modId={mod.id} summary={mod.summary} tags={mod.tags}/>
            </TabsContent>}
        </Tabs>
      </div>
    </div>
  );
};

export default ModPage;