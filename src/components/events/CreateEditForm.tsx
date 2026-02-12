import {
  createFormHook,
  createFormHookContexts,
  formOptions,
} from "@tanstack/react-form";
import { ComponentProps } from "react";
import { Platform, View } from "react-native";

import { eventSchema } from "../../schemas/event";
import { DateTimePicker } from "../ui/DateTimePicker";
import { Field } from "../ui/Field";
import { TextArea } from "../ui/TextArea";

const formSchema = eventSchema.pick({ datetime: true, description: true });

const formOpts = formOptions({
  defaultValues: {
    datetime: new Date(),
    description: "",
  },
  validators: {
    onSubmit: formSchema,
  },
});

const { fieldContext, formContext } = createFormHookContexts();
const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});

type AdditionalProps = {
  isPending?: boolean;
};

export const EventsCreateEditForm = withForm({
  ...formOpts,
  props: {} as AdditionalProps,
  render: ({ form, isPending }) => (
    <View className={"gap-2"}>
      <form.Field name={"datetime"}>
        {(field) => (
          <Field.Root errors={field.state.meta.errors}>
            <Field.Label>Date & Time</Field.Label>
            {Platform.OS === "ios" ? (
              <View className={"items-center"}>
                <DateTimePicker
                  disabled={isPending}
                  mode={"datetime"}
                  onChange={(date) => field.handleChange(date)}
                  value={field.state.value}
                />
              </View>
            ) : (
              <View className={"flex-row gap-2"}>
                <View className={"flex-1"}>
                  <DateTimePicker
                    disabled={isPending}
                    mode={"date"}
                    onChange={(date) => {
                      const newDate = new Date(date);

                      newDate.setHours(field.state.value.getHours());
                      newDate.setMinutes(field.state.value.getMinutes());

                      field.handleChange(newDate);
                    }}
                    value={field.state.value}
                  />
                </View>
                <View className={"flex-1"}>
                  <DateTimePicker
                    disabled={isPending}
                    mode={"time"}
                    onChange={(date) => {
                      const newDate = new Date(field.state.value);

                      newDate.setHours(date.getHours());
                      newDate.setMinutes(date.getMinutes());

                      field.handleChange(newDate);
                    }}
                    value={field.state.value}
                  />
                </View>
              </View>
            )}
            <Field.Error />
          </Field.Root>
        )}
      </form.Field>

      <form.Field name={"description"}>
        {(field) => {
          return (
            <Field.Root errors={field.state.meta.errors}>
              <Field.Label>Description (Optional)</Field.Label>
              <TextArea
                disabled={isPending}
                onChangeText={field.handleChange}
                placeholder={"My description"}
                value={field.state.value || ""}
              />
              <Field.Error />
            </Field.Root>
          );
        }}
      </form.Field>
    </View>
  ),
});
export type EventsCreateEditFormProps = ComponentProps<
  typeof EventsCreateEditForm
>;

export { useAppForm, formOpts };
