select conname
from pg_constraint
where conrelid = 'recipes'::regclass;