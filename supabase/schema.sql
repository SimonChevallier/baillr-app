-- Dossiers de location
create table public.dossiers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  bailleur_id uuid references auth.users(id) on delete cascade not null,
  locataire_id uuid references auth.users(id) on delete set null,
  locataire_email text,
  adresse text not null,
  ville text not null,
  loyer numeric not null,
  charges numeric default 0,
  date_debut date,
  statut text default 'en_attente' check (statut in ('en_attente', 'actif', 'termine'))
);

-- Documents attachés à un dossier
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  dossier_id uuid references public.dossiers(id) on delete cascade not null,
  uploaded_by uuid references auth.users(id) on delete set null,
  nom text not null,
  type text not null check (type in ('contrat', 'etat_des_lieux_entree', 'etat_des_lieux_sortie', 'quittance', 'autre')),
  storage_path text not null
);

-- Row Level Security
alter table public.dossiers enable row level security;
alter table public.documents enable row level security;

-- Bailleur : accès total à ses dossiers
create policy "bailleur_full_access" on public.dossiers
  for all using (auth.uid() = bailleur_id);

-- Locataire : accès en lecture à son dossier
create policy "locataire_read_access" on public.dossiers
  for select using (auth.uid() = locataire_id);

-- Documents : accès si membre du dossier
create policy "documents_access" on public.documents
  for all using (
    exists (
      select 1 from public.dossiers d
      where d.id = dossier_id
      and (d.bailleur_id = auth.uid() or d.locataire_id = auth.uid())
    )
  );

-- Storage bucket pour les documents
insert into storage.buckets (id, name, public) values ('documents', 'documents', false);

create policy "documents_storage_access" on storage.objects
  for all using (bucket_id = 'documents' and auth.role() = 'authenticated');
