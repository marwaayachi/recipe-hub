-- Public policy
create policy "Anyone can read public recipes"
on recipes
for select
to anon, authenticated
using (is_public = true);