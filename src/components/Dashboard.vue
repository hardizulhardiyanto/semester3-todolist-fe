<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters justify="space-between" class="justify-center">
      <v-col cols="6" sm="4">
        <div>
          <p class="font-weight-black">Welcome In Dashboard</p>
        </div>
      </v-col>
      <v-col cols="6" sm="4" class="text-right">
        <div>
          <v-btn depressed color="primary" @click="dialog = true">
            <v-icon dark> mdi-plus </v-icon>
            Add New
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <div>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Tambah Kegiatan?
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="form.nama_barang"
                :rules="nameRules"
                :counter="10"
                label="Tambah Kegiatan"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialog = false"> Cancel </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="fetchAddData()"
              :disabled="!valid"
            >
              I Accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table
      :headers="headers"
      :items="listKegiatan"
      sort-by="id"
      :sort-desc="true"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="search"
              label="Cari Kegiatan ..."
              class="mx-4"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  name: "Dashboard",
  data: () => ({
    search: "",
    listKegiatan: [],
    dialog: false,
    form: {},
    valid: true,
    nameRules: [
      (v) => !!v || "Nama Kegiatan is required",
      (v) => (v && v.length <= 10) || "Nama Kegiatan must be less than 10 characters"
    ],


    headers: [
      {
        text: "ID List",
        value: "id",
        align: "center",
        sortable: true,
      },
      {
        text: "Nama Kegiatan",
        value: "nama_barang",
        align: "start",
        sortable: true,
      },

      { text: "Actions", value: "actions", sortable: false },
    ],
    
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.fetchAllData();
  },

  methods: {
    fetchAllData() {
      this.$store.dispatch('todos/fetchAllTodo')
      .then((data) => {
        this.listKegiatan = data.data
      })
      .catch((error) => {
        console.log("ERROR GET ALL", error);
      })
    },

    fetchAddData() {
      this.$store.dispatch('todos/fetchAddTodo', this.form)
      .then((data) => {
        this.fetchAllData()
        this.close()
      })
      .catch((error) => {
        console.log("ERROR GET ALL", error);
      })
    },

    close() {
      this.dialog = false;
      this.form = {}
    },
  },
};
</script>