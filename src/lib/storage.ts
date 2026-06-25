// 1. ADD THIS LINE AT THE TOP:
import { supabase } from './supabase'; 

export const uploadImage = async (file: File, bucket: string = 'inventory') => {
  const fileName = `${Math.random()}-${file.name}`;
  const filePath = fileName; 

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};