import { createClient } from '@supabase/supabase-js';

import type { Database } from './types';

const projectURL = 'https://ssccvtrsjkxpanegxlqb.supabase.co';
const apiKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzY2N2dHJzamt4cGFuZWd4bHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3NzcyNzMsImV4cCI6MTk4OTM1MzI3M30.UpIrVxd0f8F6xk4Spaw_sowu7ZfUgI_sAwMCxbacDg4';

const supabase = createClient<Database>(projectURL, apiKey);

// An example of how to get a model from Database:
// type Cities = Database['public']['Tables']['cities']['Insert'];
// const city: Cities = { isCapital: true, name: 'Berlin' };

export default supabase;
