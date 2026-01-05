import {
  createFormHook,
  createFormHookContexts,
  formOptions,
} from "@tanstack/react-form";
import { ComponentProps } from "react";
import { View } from "react-native";

import { categorySchema } from "../../schemas/category";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";

const formSchema = categorySchema.pick({ name: true });

const formOpts = formOptions({
  defaultValues: {
    name: "",
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

export const CategoriesCreateEditForm = withForm({
  ...formOpts,
  props: {} as AdditionalProps,
  render: ({ form, isPending }) => {
    return (
      <View>
        <form.Field name={"name"}>
          {(field) => {
            return (
              <Field.Root errors={field.state.meta.errors}>
                <Field.Label>Name</Field.Label>
                <Input
                  disabled={isPending}
                  onChangeText={field.handleChange}
                  placeholder={"My routine"}
                  value={field.state.value}
                />
                <Field.Error />
              </Field.Root>
            );
          }}
        </form.Field>
      </View>
    );
  },
});
export type CategoriesCreateEditFormProps = ComponentProps<
  typeof CategoriesCreateEditForm
>;

export { useAppForm, formOpts };
