import ActivityCard from "./ActivityCard";
import activities from '../../../../resources/activities.json'
import suppliers from '../../../../resources/suppliers.json'
import { getActivitiesWithSuppliers } from "../../utils/utils";

const activitiesWithSuppliers = getActivitiesWithSuppliers(activities, suppliers)

export default {
  title: "Components/ActivityCard",
  component: ActivityCard,
  args: {
    activity: activitiesWithSuppliers[0],
  },
}

export const Default = (args) => <ActivityCard {...args} />

export const withSpecialOffer = {
  render: Default,
  args: {
    activity: {
      ...activitiesWithSuppliers[0],
      specialOffer: true,
    }
  }
}