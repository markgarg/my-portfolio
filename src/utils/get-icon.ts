import ICONS, { type IconType } from './icon-constants';

type IconName = 'twitter' | 'github' | 'email' | 'rss' | 'linkedin' | 'medium' | 'stackexchange' | 'salesforce';

const getIcon = (name: string): IconType | Record<string, never> => {
  const iconMap: Record<IconName, IconType> = {
    twitter: ICONS.Twitter,
    github: ICONS.GitHub,
    email: ICONS.Email,
    rss: ICONS.RSS,
    linkedin: ICONS.LinkedIn,
    medium: ICONS.Medium,
    stackexchange: ICONS.StackExchange,
    salesforce: ICONS.Salesforce,
  };

  const iconKey = name.toLowerCase() as IconName;
  return iconMap[iconKey] || {};
};

export default getIcon;
