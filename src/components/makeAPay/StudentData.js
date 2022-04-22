import { StudentInformation } from '../ui/StudentInformation'

export const StudentData = ({ studentInfo, loading }) => {
    return (
        <div className='makeAPay__body__container__studentData'>
            <StudentInformation
                studentInformation={studentInfo}
                loading={loading}
            />
        </div>
    )
}
