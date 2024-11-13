import { createContext, ReactNode, useContext } from 'react';
import { Assets } from '@/lib/schemas/assets.schema';
import { useGenerateInvestmentAssets } from '@/hooks/useGenerateInvestmentAssets';
import { AssetGlobalVariation, KeyVariation, VariationAssetsSettings } from "@/@types/investment";
import { useVariation, baseDrift, baseVolatility, baseChanceOfLoss } from '@/hooks/useVariation';


type InvestmentAssetsState = {
  assets: Assets[];
  updateAssets: (assets: Assets[]) => void;
  variationSettings: VariationAssetsSettings
};

const InvestmentAssetsContext = createContext<InvestmentAssetsState>({
  assets: [], updateAssets: () => {}, 
  variationSettings: { 
    drift: baseDrift, 
    volatility: baseVolatility, 
    loss: baseChanceOfLoss, 
    setVariationAsset: (
      variationAssetValue: number, 
      profileAssetKey: keyof AssetGlobalVariation, 
      variationAssetKey: KeyVariation
    )=>{}
  }
});

const InvestmentAssetsProvider = ({ children }: { children: ReactNode }) => {
  const { assets, updateAssets } = useGenerateInvestmentAssets();
  const variationSettings = useVariation();

  return (
    <InvestmentAssetsContext.Provider value={{ assets, updateAssets, variationSettings}}>
      {children}
    </InvestmentAssetsContext.Provider>
  );
};

const useInvestmentAssets = () => {
  const context = useContext(InvestmentAssetsContext);
  if (!context) throw new Error('useInvestmentAssets must be used within a InvestmentAssetsProvider');
  return context;
};

export { InvestmentAssetsProvider, useInvestmentAssets };
export type { AssetGlobalVariation }