// src/lib/storage.ts
import { supabase } from './supabase';

export const uploadImage = async (file: File, bucket: string = 'inventory') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`; // Folders are handled by the bucket path

  // 1. Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // 2. Get Public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  
  return data.publicUrl;
};