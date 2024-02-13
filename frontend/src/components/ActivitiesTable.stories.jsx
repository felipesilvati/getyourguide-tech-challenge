import ActivitiesTable from "./ActivitiesTable";

export default {
  title: "Components/ActivitiesTable",
  component: ActivitiesTable,
}

const Template = (args) => <ActivitiesTable {...args} />;

export const Default = Template.bind({});