import ActivityCard from "./ActivityCard";
import activities from '../../../../resources/activities.json'


export default {
  title: "Components/ActivityCard",
  component: ActivityCard,
  args: {
    activity: activities[0],
  },
}

export const Template = (args) => <ActivityCard {...args} />

export const withSpecialOffer = {
  render: Template,
  args: {
    activity: {
      ...activities[0],
      specialOffer: true,
    }
  }
}