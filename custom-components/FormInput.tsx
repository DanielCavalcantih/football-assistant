import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ComponentProps } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  control: Control<T>;
  name: Path<T>;
}& ComponentProps<typeof Input>;

const FormInput = <T extends FieldValues>({ 
    label, 
    placeholder, 
    required, 
    control, 
    name,
    ...props 
}: FormInputProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Field>
                    <FieldLabel>{label}</FieldLabel>
                    <Input 
                        {...field}
                        placeholder={placeholder} 
                        required={required} 
                        {...props}
                    />
                </Field>
            )}
        />
    )
}

export default FormInput;
