export type Role = "bailleur" | "locataire";

export type Dossier = {
  id: string;
  created_at: string;
  bailleur_id: string;
  locataire_id: string | null;
  locataire_email: string | null;
  adresse: string;
  ville: string;
  loyer: number;
  charges: number;
  date_debut: string | null;
  statut: "en_attente" | "actif" | "termine";
};

export type Document = {
  id: string;
  created_at: string;
  dossier_id: string;
  uploaded_by: string | null;
  nom: string;
  type: "contrat" | "etat_des_lieux_entree" | "etat_des_lieux_sortie" | "quittance" | "autre";
  storage_path: string;
};
