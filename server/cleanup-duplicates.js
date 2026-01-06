import { supabase } from './src/lib/supabase';
async function cleanupDuplicates() {
    console.log('🔍 Checking for duplicate categories...');
    const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .order('id', { ascending: true });
    if (error) {
        console.error('❌ Error fetching categories:', error);
        return;
    }
    if (!categories || categories.length === 0) {
        console.log('ℹ️ No categories found.');
        return;
    }
    const seen = new Map();
    const duplicates = [];
    for (const cat of categories) {
        const normalizedName = cat.name.trim().toLowerCase();
        if (seen.has(normalizedName)) {
            duplicates.push(cat);
        }
        else {
            seen.set(normalizedName, cat);
        }
    }
    if (duplicates.length === 0) {
        console.log('✅ No duplicate categories found.');
        return;
    }
    console.log(`⚠️ Found ${duplicates.length} duplicate categories. Removing...`);
    const idsToRemove = duplicates.map(d => d.id);
    const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .in('id', idsToRemove);
    if (deleteError) {
        console.error('❌ Error removing duplicates:', deleteError);
        console.log('💡 Tip: If you have RLS (Row Level Security) enabled, you might need to use the Service Role Key or run this SQL in the Supabase Dashboard:');
        console.log(`
      DELETE FROM categories WHERE id IN (${idsToRemove.join(',')});
    `);
    }
    else {
        console.log(`✅ Successfully removed ${duplicates.length} duplicates.`);
    }
}
cleanupDuplicates();
