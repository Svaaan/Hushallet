import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HouseholdSwipeParamList } from './HouseholdSwipeNavigator';
import { RootStackParamList } from './RootNavigator';

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HouseholdSwipeScreenProps<T extends keyof HouseholdSwipeParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<HouseholdSwipeParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
