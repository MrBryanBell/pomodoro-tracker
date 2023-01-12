import { createClient } from '@supabase/supabase-js';

import type { Database } from './types';

const projectURL = 'https://hietoptcjrcgawytdizp.supabase.co';
const apiKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZXRvcHRjanJjZ2F3eXRkaXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM0MzQzMTcsImV4cCI6MTk4OTAxMDMxN30.6UapBwDJaMTsuI3Yee1eZGvX2RdlaMyQJTmSnciVAdw';

const supabase = createClient<Database>(projectURL, apiKey);

// An example of how to get a model from Database:
// type Cities = Database['public']['Tables']['cities']['Insert'];
// const city: Cities = { isCapital: true, name: 'Berlin' };

export default supabase;
