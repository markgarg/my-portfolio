// @flow strict
import ICONS from './icon-constants';

const getIcon = (name: string) => {
  let icon;

  switch (name.toLowerCase()) {
    case 'twitter':
      icon = ICONS.Twitter;
      break;
    case 'github':
      icon = ICONS.GitHub;
      break;
    case 'email':
      icon = ICONS.Email;
      break;
    case 'rss':
      icon = ICONS.RSS;
      break;
    case 'linkedin':
      icon = ICONS.LinkedIn;
      break;
    case 'medium':
      icon = ICONS.Medium;
      break;
    case 'stackexchange':
      icon = ICONS.StackExchange;
      break;
    default:
      icon = {};
      break;
  }

  return icon;
};

export default getIcon;
