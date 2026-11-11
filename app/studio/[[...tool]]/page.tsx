"use client";
import {NextStudio} from 'next-sanity/studio';
import config from '../../../sanity.config';
export default function StudioPage(){if(!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)return <main style={{padding:50}}>Bitte zuerst NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local eintragen.</main>;return <NextStudio config={config}/>}
