import baseI18n from '@/i18n';

export default function useI18n(scope?: string) {
  const global = baseI18n.global;

  const st = (path: string) => global.t(`${scope}.${path}`);

  return { ...baseI18n.global, st };
}
