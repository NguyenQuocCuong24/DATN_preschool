type Props = {
    onClick: () => void;
};

const CreateButton = (props: Props) => {
    const {onClick} = props;
    return(
        <div className="px-4 py-2 bg-button-primary w-fit rounded text-white font-medium cursor-pointer" onClick={onClick}>
            +&nbsp;&nbsp;&nbsp;Thêm
        </div>
    )
}

export default CreateButton;