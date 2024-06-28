export interface User {
    id: string;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    role: string;
    lang: string;
    newsletter: string;
    user_domain: string;
    last_active: string | null;
    meta: {
      current_club: string;
      nationality: string;
      date_of_birth: string;
      place_of_birth: string;
      height: string;
      height_unit: string;
      weight: string;
      weight_unit: string;
      contract_start: string;
      contract_end: string;
      league_level: string;
      foot: string;
      age: string;
    } | null;
  }
  