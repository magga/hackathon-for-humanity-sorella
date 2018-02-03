const followReplyTemplate = (displayName) => {
    return [
        {
            type: "text",
            text: `Hello ${displayName}`
        },
        {
            type: "sticker",
            packageId: 3,
            stickerId: 242
        },
        {
            type: "text",
            text: "Selamat datang di Sorella"
        },
        {
			type: "template",
			altText: `${displayName}, sekarang profesi kamu sebagai apa?`,
			template: {
				type: "buttons",
				thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/hackathon-9ad8e.appspot.com/o/3.jpg?alt=media&token=ce0bfee0-54a3-4e68-810d-4e4d3d3b65f5",
				imageAspectRatio: "rectangle",
				imageSize: "cover",
				imageBackgroundColor: "#FFFFFF",
				title: "Pekerjaan",
				text: `${displayName}, sekarang profesi kamu sebagai apa?`,
				actions: [
					{
						type: "postback",
						label: "Bekerja",
						data: "action=pekerjaan&payload=Bekerja"
					},
					{
						type: "postback",
						label: "Kuliah",
						data: "action=pekerjaan&payload=Kuliah"
					},
					{
						type: "postback",
						label: "Sekolah",
						data: "action=pekerjaan&payload=Sekolah"
					},
					{
						type: "postback",
						label: "Di rumah saja",
						data: "action=pekerjaan&payload=rumah"
					}
				]
			}
		}
    ];
}; 

const unfollowReplyTemplate = () => {
    return [
        {
            type: "text",
            text: `We're sad to see you go`
        },
        {
            type: "sticker",
            packageId: 1,
            stickerId: 16
        },
        {
            type: "text",
            text: "Please come back!"
        }
    ];
};

const joinGroupReplyTemplate = (groupId) => {
    return [
        {
            type: "text",
            text: `Hello, ini adalah Sorella Chat Bot`
        },
        {
            type: "text",
            text: `Ketik 'SORELLA ADD ME' untuk memberitahukan grup ini ketika kamu dalam bahaya`
        },
        {
            type: "text",
            text: `Ketik 'SORELLA REMOVE ME' untuk menghapus / tidak jadi memberitahu grup ini ketika kamu dalam bahaya`
        },
        {
            type: "text",
            text: `Ketik 'SORELLA GROUP NAME GROUP_NAME' untuk merubah nama grup untuk ditampilkan pada Sorella Android/iOS App. Jika tidak diubah, grup ini akan dinamakan ${groupId}`
        },
        // {
        //     type: "text",
        //     text: `Type 'SORELLA GROUP DESCRIPTION GROUP_DESCRIPTION' to update this group's description in Sorella Android/iOS App`
        // }
        {
            type: "text",
            text: `Ketik 'SORELLA HELP' untuk menampilkan petunjuk penggunaan Sorella Bot seperti ini\n
            Ketik 'SORELLA STATUS' untuk melihat siapa saja anggota grup ini yang telah menambahkan grup ini sebagai grup Sorella-nya`
        }
    ];
};

const addMemberToGroupReplyTemplate = (displayName) => {
    return [
        {
            type: "text",
            text: `Selamat, ${displayName} telah menambahkan grup ini ke list grup Sorella-nya`
        },
        {
            type: "text",
            text: `Kapanpun ${displayName} sedang dalam bahaya, grup ini akan dinotifikasi oleh Sorella Chat Bot`
        }
    ];
};

const removeMemberFromGroupReplyTemplate = (displayName) => {
    return [
        {
            type: "text",
            text: `Aku sedih memberitahu bahwa ${displayName} telah menghapus grup ini dari grup Sorella-nya`
        },
        {
            type: "sticker",
            packageId: 3,
            stickerId: 188
        },
        {
            type: "text",
            text: `Tapi jangan khawatir, ${displayName}! Kamu dapat menambahkan grup ini ke list grup Sorella-mu kapanpun dengan mengetik 'SORELLA ADD ME' lagi`
        }
    ];
};

const changeGroupNameReplyTemplate = (groupName) => {
    return [
        {
            type: "text",
            text: `Nama grup ini telah diganti menjadi ${groupName} untuk ditampilkan di Sorella App`
        },
        {
            type: "text",
            text: `Download aplikasi Sorella di Android/iOS untuk melihat perubahan ini`
        }
    ];
};

const changeGroupDescriptionReplyTemplate = () => {
    return [
        {
            type: "text",
            text: `This group's description has been updated for the Sorella App`
        },
        {
            type: "text",
            text: `Please download our Sorella App in Android/iOS to see the change`
        }
    ];
};

const sendHelpWithLocationReplyTemplate = (message) => {
    return [
        {
            type: "text",
            text: `${message.displayName} sedang dalam bahaya dan butuh bantuanmu!`
        },
        {
            type: "text",
            text: message.address || 'No Address. Map :'
        },
        {
            type: "location",
            title: "Peta",
            latitude: message.latitude,
            longitude: message.longitude,
            address: 'Klik Di Sini'
        }
    ];
};

const listAddedUserInGroupReplyTemplate = (members) => {
    if (members.length < 1) {
        return [
            {
                type: "text",
                text: `Belum ada user di grup ini yang menambahkan grup ini di list grup Sorella-nya`
            },
            {
                type: "text",
                text: `Ayo tambahkan grup ini di list grup Sorella-mu dengan mengetik 'SORELLA ADD ME'`
            },
            {
                type: "sticker",
                packageId: 3,
                stickerId: 195
            }
        ];
    } else {
        let listMember = '';

        members.map((member, idx) => {
            listMember += `${idx+1}. ${member}\n`;
        });

        return [
            {
                type: "text",
                text: `Berikut ini adalah anggota grup yang telah menambahkan grup ini di list grup Sorella-nya`
            },
            {
                type: "text",
                text: listMember
            },
            {
                type: "text",
                text: `Ayo tambahkan grup ini di list grup Sorella-mu dengan mengetik 'SORELLA ADD ME'`
            }
        ];
    }
};

const replyPostbackJobReplyTemplate = (job) => {
    return [
        {
			type: "template",
			altText: `Jam berapa kamu pulang ${job}?`,
			template: {
				type: "buttons",
				thumbnailImageUrl: "https://firebasestorage.googleapis.com/v0/b/hackathon-9ad8e.appspot.com/o/Time.jpg?alt=media&token=4d118f5c-4fcd-452c-9137-d475c2f822a1",
				imageAspectRatio: "rectangle",
				imageSize: "cover",
				imageBackgroundColor: "#FFFFFF",
				title: "Pekerjaan",
				text: `Kira - kira, jam berapa kamu pulang ${job}?`,
				actions: [
					{  
                        "type":"datetimepicker",
                        "label":"Pilih jam",
                        "data":"action=jam-pulang",
                        "mode":"time",
                        "initial":"18:00"
                     }
				]
			}
		}
    ];
};

const finalJoinPostbackReplyTemplate = () => {
    return [
        {
            type: "text",
            text: `Keren!`
        },
        {
            type: "sticker",
            packageId: 3,
            stickerId: 180
        },
        {
            type: "text",
            text: `Terakhir, ketik 'SORELLA BUTTON [BUTTON_ID] untuk menambahkan Tombol Sorella jika kamu punya`
        },
        {
            type: "text",
            text: `Selamat menggunakan Sorella!`
        }        
    ];
};

const askForSharingReplyTemplate = (displayName) => {
    return [
        {
            type: "text",
            text: `Hey ${displayName}, kangen nih. Cerita - cerita dong kalau kamu sedang ada masalah`
        },
        {
            type: "sticker",
            packageId: 3,
            stickerId: 246
        }
    ];
};

const addUserButtonReplyTemplate = (buttonId) => {
    return [
        {
            type: "text",
            text: `Selamat! Kamu telah menambahkan button dengan id : ${buttonId}`
        },
        {
            type: "text",
            text: `Jangan ragu - ragu menekan tombol darurat ketika kamu merasa dalam bahaya`
        },
        {
            type: "text",
            text: `Grup yang telah kamu tambahkan Sorella di dalamnya akan diberi notifikasi ketika kamu menekan tombol darurat`
        }
    ];
};

module.exports = {
    followReplyTemplate,
    unfollowReplyTemplate,
    joinGroupReplyTemplate,
    addMemberToGroupReplyTemplate,
    removeMemberFromGroupReplyTemplate,
    changeGroupNameReplyTemplate,
    changeGroupDescriptionReplyTemplate,
    sendHelpWithLocationReplyTemplate,
    listAddedUserInGroupReplyTemplate,
    replyPostbackJobReplyTemplate,
    finalJoinPostbackReplyTemplate,
    askForSharingReplyTemplate,
    addUserButtonReplyTemplate
};
