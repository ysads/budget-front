import baseI18n from '@/i18n';

type BaseI18n = typeof baseI18n.global;

interface UseI18nHook extends BaseI18n {
  st: (path: string) => string;
}

export default function useI18n(scope?: string): UseI18nHook {
  const global = baseI18n.global;

  const st = (path: string) => global.t(`${scope}.${path}`);

  return { ...baseI18n.global, st };
}
