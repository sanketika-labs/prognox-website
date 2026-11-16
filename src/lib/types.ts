import type { IconName } from '~/lib/icons';

/** A single card in a FeatureGrid. */
export interface Feature {
  icon: IconName;
  title: string;
  body: string;
}
