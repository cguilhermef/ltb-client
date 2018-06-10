export function PositionIconById(roleId: number): string {
  const path = (position: string) => `assets/images/${ position }.png`;
  if ( roleId === 1 ) {
    return path('top-icon');
  }
  if ( roleId === 2 ) {
    return path('mid-icon');
  }
  if ( roleId === 3 ) {
    return path('bot-icon');
  }
  if ( roleId === 4 ) {
    return path('jungle-icon');
  }
  return path('support-icon');
}
