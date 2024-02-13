import ActivityCard from "./ActivityCard";
import activities from '../../../resources/activities.json'

export default {
  title: "Components/ActivitiesTable",
  component: ActivityCard,
  args: {
    activity: activities[0],
  },
}

const Template = (args) => <ActivityCard {...args} />;

export const Default = Template.bind({});