import {createClient} from '@supabase/supabase-js';

export default defineEventHandler(async (event)=>{

  const config = useRuntimeConfig();
  
  const supabase = createClient(config.supabaseUrl, config.supabaseKey)
  const data1 = await supabase.from('essencias').select()
  const data2 = await supabase.from('aluminios').select()
  const data3 = await supabase.from('carvoes').select()
  const data4 = await supabase.from('acendedor').select()
  const data5 = await supabase.from('rosh').select()
  const data6 = await supabase.from('pegador').select()
  const response = data1.data.concat(data2.data).concat(data3.data).concat(data4.data).concat(data5.data).concat(data6.data)
  return{
    response, data1, data2, data3, data4, data5,data6
  }
  
})