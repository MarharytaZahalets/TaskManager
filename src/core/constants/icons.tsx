import React from 'react';

import {
  CalendarIcon,
  CanceledIcon,
  CirclePlusIcon,
  DoneIcon,
  FilterIcon,
  InProcessIcon,
  LongArrowRightIcon,
  OngoingIcon,
  SearchIcon,
} from 'assets/icons/svg';
import { Colors } from 'core/theme/colors';

import type { TaskStatus } from 'models/TaskList';
export type IconType = 'arrow' | 'calendar' | 'circlePlus' | 'filter' | 'search';

export const TAB_ICON_SIZE: number = 28;

export const STATUS_ICON_SIZE: number = 24;

export const ICON_SIZE_20 = 20;
export const ICON_SIZE_28 = 28;
export const ICON_SIZE_50 = 50;

export const STATUS_ICONS: Record<TaskStatus, React.ReactNode> = {
  ongoing: (
    <OngoingIcon
      width={STATUS_ICON_SIZE}
      height={STATUS_ICON_SIZE}
      color={Colors.labelOngoing}
    />
  ),
  inProcess: (
    <InProcessIcon
      width={STATUS_ICON_SIZE}
      height={STATUS_ICON_SIZE}
      color={Colors.labelInProgress}
    />
  ),
  done: (
    <DoneIcon
      width={STATUS_ICON_SIZE}
      height={STATUS_ICON_SIZE}
      color={Colors.labelDone}
    />
  ),
  canceled: (
    <CanceledIcon
      width={STATUS_ICON_SIZE}
      height={STATUS_ICON_SIZE}
      color={Colors.labelCancel}
    />
  ),
};

export const APP_STATIC_ICONS: Record<IconType, React.ReactNode> = {
  arrow: (
    <LongArrowRightIcon
      width={ICON_SIZE_50}
      height={ICON_SIZE_50}
      color={Colors.accent}
    />
  ),
  calendar: (
    <CalendarIcon width={ICON_SIZE_20} height={ICON_SIZE_20} color={Colors.primary} />
  ),
  circlePlus: (
    <CirclePlusIcon width={ICON_SIZE_28} height={ICON_SIZE_28} color={Colors.accent} />
  ),
  filter: <FilterIcon width={ICON_SIZE_28} height={ICON_SIZE_28} color={Colors.accent} />,
  search: <SearchIcon width={ICON_SIZE_28} height={ICON_SIZE_28} color={Colors.accent} />,
};
