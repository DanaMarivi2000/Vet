
type PatientDetailItemProps={
    label:string,
    data:string
}

const PatientDetailItem = ({label, data}:PatientDetailItemProps) => {
  return (
    <div>
      <p className='font-bold mb-3 text-gray-700 uppercase'>{label}: {''}
        <span className='font-normal normal-case'>{data}</span>
      </p>
    </div>
  )
}

export default PatientDetailItem
