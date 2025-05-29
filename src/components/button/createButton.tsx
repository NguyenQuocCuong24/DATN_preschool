import { isAdmin } from "@/src/utils/userInfo";

type Props = {
    onClick: () => void;
};

const CreateButton = (props: Props) => {
    const {onClick} = props;
    if (!isAdmin()) {
        return (
            <div></div>
        )
    }
    return(
        <div className="px-4 py-2 bg-button-primary w-fit rounded text-white font-medium cursor-pointer max-h-10" onClick={onClick}>
            +&nbsp;&nbsp;&nbsp;Thêm
        </div>
    )
}

export default CreateButton;