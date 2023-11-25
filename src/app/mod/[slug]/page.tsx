import React from 'react';

import ModInfoCard from '@/components/mod/mod-info-card';
import { db } from '@/server/db';  
import ModAuthorCard from '@/components/mod/mod-author-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExternalResourcesCard from '@/components/mod/external-resources-card';
import ModDescriptionForm from '@/components/forms/mod-description-form';
import { getServerAuthSession } from '@/server/auth';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params } : Props) {
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

const ModPage = async ({ params } : Props) => {
  const session = await getServerAuthSession();
  const mod = await db.project.findUnique({
    where: {
      type: "mod",
      slug: params.slug
    },
    include: {
      author: true
    }
  });

  if (!mod) {
    return <div className='w-full flex h-full justify-center items-center'>Mod not found</div>;
  }

  const disableEditor = session?.user?.id === mod.author.id ? true : false;

  return (
    <div className='flex gap-6 pt-16 h-full'>
      <div className='w-full lg:col-span-6 flex flex-col gap-4'>
        <Tabs defaultValue="description">
          <TabsList className='w-full flex justify-evenly'>
            <TabsTrigger value="description" className='w-full'>Description</TabsTrigger>
            <TabsTrigger value="gallery" className='w-full'>Gallery</TabsTrigger>
            <TabsTrigger value="releases" className='w-full'>Releases</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className='bg-accent rounded-xl p-4'>
            <ModDescriptionForm disabled={disableEditor}/>
          </TabsContent>
          <TabsContent value="gallery" className='bg-accent rounded-xl p-4'>Mod gallery here</TabsContent>
          <TabsContent value="releases" className='bg-accent rounded-xl p-4'>Mod releases here</TabsContent>
        </Tabs>
      </div>
      <div className='flex flex-col w-96 gap-4'>
        <ModInfoCard 
          icon={null} 
          name={mod.name}
          summary={mod.summary}
          downloads={mod.downloads}
          createdAtTimeStamp={mod.createdAt.toLocaleDateString()}
          updatedAtTimeStamp={mod.updatedAt.toLocaleDateString()}
          approved={mod.approved}
          draft={mod.draft}
        />
        <ExternalResourcesCard issueLink="https://www.google.com" sourceLink="https://www.google.com" wikiLink="https://www.google.com" discordLink="https://www.google.com" />
        <ModAuthorCard name={mod.author.name} avatar={mod.author.image} />
      </div>
    </div>
  );
};

export default ModPage;