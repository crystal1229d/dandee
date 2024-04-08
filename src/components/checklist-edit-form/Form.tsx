// import { Fragment } from 'react'
// import { useForm } from 'react-hook-form'

// import { Checklist, ChecklistForm } from '@models/checklist'
// import Button from '@shared/Button'
// import Spacing from '@shared/Spacing'

// type FormData = {
//   [key: string]: string
// }

function Form() {
  return <div>Form </div>
}
export default Form

// function Form({
//   forms,
//   onSubmit,
//   buttonLabel,
// }: {
//   forms: Checklist['forms']
//   onSubmit: (formValues: FormData) => void
//   buttonLabel: string
// }) {
//   const { register, formState, handleSubmit } = useForm<FormData>({
//     mode: 'onBlur',
//   })

//   const formComponent = (form: ChecklistForm) => {
//     if (form.type === 'TEXT_FIELD') {
//       return <input type="text" />
//     } else if (form.type === 'CHECKBOX') {
//       return <input type="checkbox" />
//     } else {
//       return null
//     }
//   }

//   return (
//     <div style={{ padding: 24 }}>
//       <form>
//         {/* {forms.map((form) => {
//           return (
//             <Fragment key={form.id}>
//               {formComponent(form)}
//               <Spacing size={8} />
//             </Fragment>
//           )
//         })} */}
//       </form>

//       <Spacing size={80} />

//       <Button title={buttonLabel} onClick={handleSubmit(onSubmit)} />
//     </div>
//   )
// }

// export default Form
