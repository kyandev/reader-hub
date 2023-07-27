class userType
{

    READER = 0;
    WRITER = 1;

    getAll()
    {
        return [
            this.READER = "reader",
            this.WRITER = "writer",
        ];
    }

    getOne(index)
    {
        return this.getAll()[index];
    }
}