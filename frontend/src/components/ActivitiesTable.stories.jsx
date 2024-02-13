import ActivitiesTable from "./ActivitiesTable";
import activities from '../../../resources/activities.json'

export default {
  title: "Components/ActivitiesTable",
  component: ActivitiesTable,
  args: {
    activities,
  },
}

const Template = (args) => <ActivitiesTable {...args} />;

export const Default = Template.bind({});