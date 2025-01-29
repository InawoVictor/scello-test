<template>
  <div class="px-[7%] py-10">
    <!-- <AppHeader /> -->
    <h3 class="text-sm uppercase text-purpleDark font-bold">Table Heading</h3>
    <div class="flex border-b border-b-purpleDark items-center justify-between mt-5 ">
      <BaseTab 
        @update:title="getSelectedTab"
        :tabTitles="['All', 'Paid', 'Unpaid', 'Overdue']"
      />
      <p class="text-sm font-normal text-purpleDark">
        Total payable amount: <span class="font-bold text-purple">$900.00</span> <span class="font-[400]">USD</span>
      </p>
    </div>

    <section class=" mt-10 overflow-hidden bg-white rounded-lg shadow-sm">
      <div class="flex items-center flex-1 px-5 py-4 justify-between">
        <div class="flex gap-4 items-center">
          <div class="relative">
            <button
              type="button"
              class="flex border cursor-pointer border-solid items-center gap-1 text-[16px] text-[#25213B] border-purpleDark px-3 py-2 rounded-md"
              @click="showFilter = !showFilter"
            >
              <img src="/svg/funnel.svg" class="h-[20px] w-[20px]" alt="">
              <span>Filter</span>
            </button>  
            <div v-if="showFilter"
              class="absolute overflow-y-scroll z-50 top-14 h-[290px] w-[200px] py-3 px-2 bg-[white] rounded-md shadow-md"
            >
              <h6 class="text-sm font-normal text-purpleDark">SORT BY:</h6>
              <div class="mt-1 border-b border-solid pb-1 border-b-primary">
                <ul class="flex flex-col gap-y-1">
                  <li class="p-1 flex items-center justify-between hover">
                    <label for="default">Default</label> 
                    <input id="default" type="checkbox">
                  </li>
                  <li class="p-1 flex items-center justify-between hover">
                    <label for="firstName">First Name</label> 
                    <input id="firstName" type="checkbox">
                  </li>
                  <li class="p-1 flex items-center justify-between hover">
                    <label for="lastName">Last Name</label> 
                    <input id="lastName" type="checkbox">
                  </li>
                  <li class="p-1 flex items-center justify-between hover">
                    <label for="dueDate">Due Date</label> 
                    <input id="dueDate" type="checkbox">
                  </li>
                  <li class="p-1 flex items-center justify-between hover">
                    <label for="lastlogin">Last Login</label> 
                    <input id="lastlogin" type="checkbox">
                  </li>
                </ul>
              </div>
              <h6 class="text-sm mt-2 font-normal text-purpleDark">USER:</h6>
              <div class="mt-1">
                <ul class="flex flex-col">
                  <li class="p-1 flex items-center justify-between hover">
                    <label for="all">All</label> 
                    <input id="all" type="checkbox">
                  </li>
                  <li class="p-1 flex items-center justify-between hover">
                    <label for="active">Active</label> 
                    <input id="active" type="checkbox">
                  </li>
                  <li class="p-1 flex items-center justify-between hover">
                    <label for="inactive">Inactive</label> 
                    <input id="inactive" type="checkbox">
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <BaseSearchField
            class="w-[329px] "
            v-model="searchQuery"
          />
        </div>
        <BaseButton title="PAY DUES"/>
      </div>

      <div>
        <EasyDataTable
          v-model:items-selected="itemsSelected"
          theme-color="#6D5BD0"
          table-class-name="customize-table"
          :headers="headers"
          :items="filteredItems"
          show-index-symbol="S/N"
        >
        <template #item-name="item">
          <div class="">
            <p class="text-sm text-dark font-medium">{{item.name}}</p>
            <p class="text-sm text-purpleDark font-normal">{{item.email}}</p>
          </div>
        </template>
        <template #item-userStatus="item">
          <div class="flex flex-col gap-y-1 items-start">
            <BaseTag :status="item.userStatus" /> 
            <p class="text-[0.75rem] font-medium text-purpleDark">Last login: 14/APR/2020</p>         
          </div>
        </template>
        <template #item-paymentStatus="item">
          <div class="flex flex-col gap-y-1 items-start">
            <BaseTag :status="item.paymentStatus" /> 
            <p class="text-[0.75rem] text-[#25213B] font-medium">Paid on 15/APR/2020</p>         
          </div>
        </template>
        <template #item-amount="item">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-[#25213B] text-sm font-medium">${{item.amount}}</p>
              <p class="text-purpleDark text-[0.75rem]">USD</p>
            </div>
            <span class="text-purpleDark tex-[0.75rem]">View More</span>
          </div>
        </template>
        <template #item-id="item">
          <div>
            <div class="relative">
            <div>              
              <img class="cursor-pointer" @click="showOptions = item.id" src="/svg/dot.svg"  alt="">
            </div>
                    <div                       
                      v-if="item.id === showOptions"
                      class="absolute z-10 right-0 top-2/3 w-[150px] py-1 bg-white flex flex-col shadow-xl rounded-md"
                    >
                      <div @click="showOptions = null" class="absolute -right-2 -top-2 text-[12px] cursor-pointer bg-white flex items-center justify-center h-[16px] w-[16px] border rounded-full">
                        <span class="text-purpleDark font-bold">x</span>
                      </div>
                        <span 
                          @click="$emit('delete', item.id)"
                          class="cursor-pointer py-2 pl-2.5 hover:bg-gray-100 mx-1 hover:rounded-md transition-all duration-200 font-normal text-sm border-b border-[#ECECEC]"
                        >
                          Edit 
                        </span>
                        <span 
                          @click="$emit('edit', item.id)"
                          class="cursor-pointer py-2 pl-2.5 pr-2.5 hover:bg-gray-100 mx-1 hover:rounded-md transition-all duration-200 font-normal text-sm border-[#ECECEC]"
                        >
                          View Profile
                        </span>
                        <span 
                          @click="$emit('edit', item.id)"
                          class="cursor-pointer text-greenBg  py-2 pl-2.5 pr-2.5 hover:bg-gray-100 mx-1 hover:rounded-md transition-all duration-200 font-normal text-sm border-[#ECECEC]"
                        >
                          Activiate User
                        </span>
                        <span 
                          @click="$emit('edit', item.id)"
                          class="cursor-pointer py-2 pl-2.5 pr-2.5 hover:bg-gray-100 mx-1 hover:rounded-md transition-all duration-200 font-normal text-sm text-redBg border-[#ECECEC]"
                        >
                          Delete
                        </span>
                    </div>                    
                  </div>
          </div>
        </template>
        <template #expand="item">
          <div class="bg-[#F4F2FF]" style="padding: 0">
            <table class="w-full">
              <thead>
                <tr class="bg-primary ">
                  <th class="text-[0.75rem] text-start py-4 px-3 text-purpleDark font-medium">DATE</th>
                  <th class="text-[0.75rem] w-[300px] text-start px-3 text-purpleDark font-medium">USER ACTIVITY</th>
                  <th class="text-[0.75rem] text-start px-3 text-purpleDark font-medium">DETAILS</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b-2 border-b-gray-200">
                  <td class="py-3 px-3 text-[0.75rem]  text-purpleDark">12/APR/2020</td>
                  <td class="px-3 py-3 text-[0.75rem]  text-dark">
                    {{item.name}} won championships in 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies.
                  </td>
                  <td class="px-3 py-3 text-[0.75rem] text-dark">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies.
                  </td>
                </tr>
                <tr class="border-b-2 border-b-gray-100">
                  <td class="py-3 px-3 text-[0.75rem]  text-purpleDark">12/APR/2020</td>
                  <td class="px-3 py-3 text-[0.75rem]  text-dark">
                    {{item.name}} won championships in 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies.
                  </td>
                  <td class="px-3 py-3 text-[0.75rem] text-dark">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        </EasyDataTable>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { Header, Item } from "vue3-easy-data-table";
import {ref, computed} from "vue"

const selectedTab = ref('all');
const itemsSelected = ref<Item[]>([]);
const showFilter = ref(false);
const showOptions = ref<null | string>(null);
const searchQuery = ref("");
const headers: Header[] = [
  { text: "NAME", value: "name" },
  { text: "USER STATUS", value: "userStatus"},
  { text: "PAYMENT STATUS", value: "paymentStatus"},
  { text: "AMOUNT", value: "amount", sortable: true},
  { text: ":", value: "id"},
];

const items: Item[] = [
  { name: "Stephen Curry", email: "example@email.com", userStatus: "inactive", paymentStatus: "paid", amount: 200, id: "1"},
  { name: "Lebron James", email: "example@email.com", userStatus: "active", paymentStatus: "unpaid", amount: 300, id: "2"},
  { name: "Kevin Durant", email: "example@email.com", userStatus: "inactive", paymentStatus: "overdue", amount: 250, id: "3"},
  { name: "Giannis Antetokounmpo", email: "example@email.com", userStatus: "active", paymentStatus: "paid", amount: 150, id: "4"},
];

const getSelectedTab = (value: string) => {    
  if( value && value === "All"){
      selectedTab.value = "all"
  }else if(value && value === "Paid"){
      selectedTab.value = "paid"
  } else if(value && value === "Unpaid"){
      selectedTab.value = "unpaid"
  } else if(value && value === "Overdue"){
      selectedTab.value = "overdue"
  }
}

const filteredItems = computed(() => {
  return items.filter(item => {
    const matchesStatus = selectedTab.value === "all" || item.paymentStatus === selectedTab.value;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim());
    return matchesStatus && matchesSearch;
  });
});

</script>

<style scoped>
.hover {
  cursor: pointer;
}
.hover:hover {
  background: var(--color-primary);
  transition: all .2s ease-in-out;
  /* padding: 2px 3px; */
}
</style>