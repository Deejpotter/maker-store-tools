// Types
export type GlobalVariables = {
  defaultKerf: number;
  defaultCutFee: number;
  defaultSetupFee: number;
};
export type StockCut = {
  stockLength: number;
  usedLength: number;
	cuts: Cut[];
	quantity: number;
};
export type Cut = {
  length: number;
  quantity: number;
};
