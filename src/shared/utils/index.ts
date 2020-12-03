export const onClientSide = () => typeof window !== 'undefined';

export const noSSR = (callback: any) => (onClientSide() ? callback : () => {});
