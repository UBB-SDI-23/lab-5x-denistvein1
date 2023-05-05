package com.tvein.universe;

import java.util.ArrayList;
import java.util.List;

public class Pagination {

    public static <T> List<T> paginate(List<T> list, int page, int pageSize){
        int size = list.size();
        List<T> newList = new ArrayList<>();
        if(size >= page * pageSize){
            if(size > (page + 1) * pageSize - 1){
                newList = list.subList(page * pageSize, (page + 1) * pageSize);
            }else{
                newList = list.subList(page * pageSize, size);
            }
        }
        return newList;
    }
}
