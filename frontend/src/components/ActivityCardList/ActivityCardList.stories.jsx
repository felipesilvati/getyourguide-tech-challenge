import ActivityCardList from './ActivityCardList';
import activities from '../../../../resources/activities.json';
import suppliers from '../../../../resources/suppliers.json';
import { getActivitiesWithSuppliers, sortBySpecialOffer } from "../../utils/utils";

const activitiesWithSuppliers = sortBySpecialOffer(getActivitiesWithSuppliers(activities, suppliers));

export default {
  title: "Components/ActivityCardList",
  component: ActivityCardList,
  args: {
    activities: activitiesWithSuppliers,
  },
};

export const Default = (args) => <ActivityCardList {...args} />;
