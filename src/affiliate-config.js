/**
 * Affiliate-Konfiguration für den Geschenke-Finder
 *
 * Hier kannst du deine Affiliate-Tags und Partner-IDs eintragen.
 * Die Links werden automatisch mit diesen Parametern generiert.
 */

export const affiliateConfig = {
  amazon: {
    name: "Amazon",
    baseUrl: "https://www.amazon.de/s",
    affiliateTag: "DEIN-AMAZON-TAG-21", // Ersetze mit deinem Amazon PartnerNet Tag
    searchParam: "k",
    buildUrl: (searchTerm) => {
      const params = new URLSearchParams({
        tag: affiliateConfig.amazon.affiliateTag,
        k: searchTerm
      });
      return `${affiliateConfig.amazon.baseUrl}?${params.toString()}`;
    }
  },

  etsy: {
    name: "Etsy",
    baseUrl: "https://www.etsy.com/de/search",
    affiliateRef: "DEIN-ETSY-REF", // Ersetze mit deiner Etsy Affiliate-Referenz
    searchParam: "q",
    buildUrl: (searchTerm) => {
      const params = new URLSearchParams({
        ref: affiliateConfig.etsy.affiliateRef,
        q: searchTerm
      });
      return `${affiliateConfig.etsy.baseUrl}?${params.toString()}`;
    }
  },

  thomann: {
    name: "Thomann",
    baseUrl: "https://www.thomann.de/de/search_dir.html",
    affiliateId: "DEIN-THOMANN-ID", // Ersetze mit deiner Thomann Partner-ID
    searchParam: "sw",
    buildUrl: (searchTerm) => {
      const params = new URLSearchParams({
        partner_id: affiliateConfig.thomann.affiliateId,
        sw: searchTerm
      });
      return `${affiliateConfig.thomann.baseUrl}?${params.toString()}`;
    }
  },

  douglas: {
    name: "Douglas",
    baseUrl: "https://www.douglas.de/de/search",
    affiliateId: "DEIN-DOUGLAS-ID", // Ersetze mit deiner Douglas Affiliate-ID
    searchParam: "query",
    buildUrl: (searchTerm) => {
      const params = new URLSearchParams({
        affil: affiliateConfig.douglas.affiliateId,
        query: searchTerm
      });
      return `${affiliateConfig.douglas.baseUrl}?${params.toString()}`;
    }
  },

  zalando: {
    name: "Zalando",
    baseUrl: "https://www.zalando.de/catalog",
    affiliateId: "DEIN-ZALANDO-ID", // Ersetze mit deiner Zalando Partner-ID
    searchParam: "q",
    buildUrl: (searchTerm) => {
      const params = new URLSearchParams({
        q: searchTerm
      });
      return `${affiliateConfig.zalando.baseUrl}?${params.toString()}`;
    }
  }
};

/**
 * Hilfsfunktion um den passenden Affiliate-Link zu generieren
 * @param {string} shopName - Name des Shops (Amazon, Etsy, Thomann, Douglas, Zalando)
 * @param {string} searchTerm - Suchbegriff für das Produkt
 * @returns {string} - Vollständiger Affiliate-Link
 */
export const getAffiliateUrl = (shopName, searchTerm) => {
  const shopKey = shopName.toLowerCase();
  const shop = affiliateConfig[shopKey];

  if (shop && shop.buildUrl) {
    return shop.buildUrl(searchTerm);
  }

  // Fallback zu Amazon wenn Shop nicht gefunden
  return affiliateConfig.amazon.buildUrl(searchTerm);
};

/**
 * Liste aller verfügbaren Shops
 */
export const availableShops = Object.keys(affiliateConfig).map(key => ({
  id: key,
  name: affiliateConfig[key].name
}));

export default affiliateConfig;
