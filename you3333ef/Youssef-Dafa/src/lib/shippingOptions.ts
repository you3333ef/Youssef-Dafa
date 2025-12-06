import { Country } from "./countries";

export const SHIPPING_OPTIONS = [
  {
    label: "Kingdom of Saudi Arabia",
    options: [
      { value: "smsa_sa", label: "SMSA Express", country: "SA" },
      { value: "aramex_sa", label: "Aramex", country: "SA" },
      { value: "zajil_sa", label: "Zajil", country: "SA" },
      { value: "naqel_sa", label: "Naqel Express", country: "SA" },
      { value: "spl_sa", label: "SPL (Saudi Post)", country: "SA" },
      { value: "aymakan_sa", label: "AyMakan", country: "SA" },
      { value: "esnad_sa", label: "Esnad Express", country: "SA" }
    ]
  },
  {
    label: "United Arab Emirates",
    options: [
      { value: "aramex_ae", label: "Aramex", country: "AE" },
      { value: "emirates_post_ae", label: "Emirates Post", country: "AE" },
      { value: "fetchr_ae", label: "Fetchr", country: "AE" },
      { value: "imile_ae", label: "iMile", country: "AE" },
      { value: "zajel_ae", label: "Zajel Courier", country: "AE" }
    ]
  },
  {
    label: "Kuwait",
    options: [
      { value: "posta_plus_kw", label: "Posta Plus", country: "KW" },
      { value: "aramex_kw", label: "Aramex", country: "KW" },
      { value: "dhl_kw", label: "DHL Kuwait", country: "KW" },
      { value: "moshat_kw", label: "Moshat", country: "KW" }
    ]
  },
  {
    label: "Qatar",
    options: [
      { value: "qatar_post_qa", label: "Qatar Post (Q-Post)", country: "QA" },
      { value: "aramex_qa", label: "Aramex", country: "QA" },
      { value: "falcon_qa", label: "Falcon Express", country: "QA" }
    ]
  },
  {
    label: "Oman",
    options: [
      { value: "oman_post_om", label: "Oman Post", country: "OM" },
      { value: "asyad_om", label: "Asyad Express", country: "OM" },
      { value: "aramex_om", label: "Aramex", country: "OM" }
    ]
  },
  {
    label: "Bahrain",
    options: [
      { value: "bahrain_post_bh", label: "Bahrain Post", country: "BH" },
      { value: "aramex_bh", label: "Aramex", country: "BH" },
      { value: "ubex_bh", label: "Ubex", country: "BH" },
      { value: "smsa_bh", label: "SMSA Bahrain", country: "BH" }
    ]
  }
];
